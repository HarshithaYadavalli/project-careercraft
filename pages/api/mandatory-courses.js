import { supabase } from '../../lib/supabaseClient.js';

const fetchLLMData = async (jobDescription) => {
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
  
      // Initialize the Generative AI client
      const genAI = new GoogleGenerativeAI("AIzaSyBwUnBbnEyxUT8B_-A7s58d2UgZ0YSFhTE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      // Define the prompt
      const prompt = `Given the following job description: ${jobDescription}, recommend a set of Mandatory courses, Add-On Courses and their best course links (proper working links only from Udemy) to prepare for this job role efficiently. Provide the output in this format: [{course_name: 'course_link'}] for both mandatory and add-on courses.`;
  
      // Generate content using the model
      const result = await model.generateContent(prompt);
      const responseText = result.response.text(); // Extract the response text
      console.log('LLM Response:', responseText); // Debug: Log the raw response
  
      // Clean and parse the response into an array of courses
      const cleanedResponse = responseText.replace(/```json|```/g, '').trim(); // Remove JSON markers
      const courses = JSON.parse(cleanedResponse); // Parse the cleaned response
      return courses;
    } catch (error) {
      console.error('Error calling LLM API:', error);
      throw error;
    }
  };

  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { jobDescription, userId } = req.body;
  
    try {
      // Fetch user data from job_customisation
      const { data: userData, error: userError } = await supabase
        .from('job_customisation')
        .select('*')
        .eq('id', userId)
        .single();
  
      if (userError) throw userError;
  
      // Check if courses are already stored in user_courses
      const { data: storedCourses, error: storedError } = await supabase
        .from('user_courses')
        .select('*')
        .eq('id', userId);
  
      if (storedError) throw storedError;
  
      // If no stored courses, call LLM API
      if (!storedCourses.length) {
        const courses = await fetchLLMData(jobDescription);
  
        // Store courses in user_courses
        const { error: insertError } = await supabase
          .from('user_courses')
          .insert(
            courses.map((course) => ({
              course_name: course.course_name,
              course_link: course.course_link,
              id: userId,
              status: 'not_started',
            }))
          );
  
        if (insertError) throw insertError;
  
        return res.status(200).json({ courses });
      } else {
        // Return stored courses
        return res.status(200).json({ courses: storedCourses });
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  }