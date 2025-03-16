import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { supabase } from '../lib/supabaseClient';

export default function Mandatory() {
  const [courses, setCourses] = useState([]);
  const [progressCourses, setProgressCourses] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch user data from job_customisation
        const { data: userData, error: userError } = await supabase
          .from('job_customisation')
          .select('*')
          .eq('id', userId) // Replace with actual user ID
          .single();

        if (userError) throw userError;

        // Fetch courses from user_courses
        const { data: storedCourses, error: storedError } = await supabase
          .from('user_courses')
          .select('*')
          .eq('id', userData.id);

        if (storedError) throw storedError;

        // If no stored courses, call LLM API
        if (!storedCourses.length) {
          const llmResponse = await fetch('/api/mandatory-courses', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jobDescription: userData.job_description,
              userId: userData.id,
            }),
          });

          const llmData = await llmResponse.json();

          if (llmData.error) throw new Error(llmData.error);

          // Store LLM-recommended courses in user_courses table
          const { error: courseInsertError } = await supabase
            .from('user_courses')
            .insert(
              llmData.courses.map((course) => ({
                course_name: course.course_name,
                course_link: course.course_link,
                id: userData.id,
                status: 'not_started',
              }))
            );

          if (courseInsertError) throw courseInsertError;

          setCourses(llmData.courses);
        } else {
          setCourses(storedCourses);
        }

        // Calculate progress
        const completed = courses.filter((course) => course.status === 'completed').length;
        const inProgress = courses.filter((course) => course.status === 'in_progress').length;
        const notStarted = courses.filter((course) => course.status === 'not_started').length;

        setProgressCourses(courses.filter((course) => course.status !== 'completed'));
        setPieChartData([
          { name: 'Completed', value: completed },
          { name: 'In Progress', value: inProgress },
          { name: 'Not Started', value: notStarted },
        ]);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-8">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-8">Mandatory Courses</h1>

      {/* Checklist of Courses */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Checklist of Courses</h2>
        <ul>
          {courses.map((course, index) => (
            <li key={index} className="mb-2">
              <a href={course.course_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {course.course_name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Progress Carousel */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Progress - Pending or Yet to be Started</h2>
        <Carousel showArrows showThumbs={false} showStatus={false} infiniteLoop>
          {progressCourses.map((course, index) => (
            <div key={index} className="p-4">
              <h3 className="text-lg font-semibold">{course.course_name}</h3>
              <a href={course.course_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Course Link
              </a>
              <p>Time Done: {course.time_done} hours</p>
              <p>Time Left: {course.time_left} hours</p>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Overall Progress Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
        <div className="flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}