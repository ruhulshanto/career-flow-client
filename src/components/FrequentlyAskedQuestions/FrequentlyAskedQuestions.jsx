const FrequentlyAskedQuestions = () => {
  const faqData = [
    {
      question: 'What is Career Guidance?',
      answer:
        'Career Guidance is the process of helping students understand their interests, strengths, and opportunities so they can make informed decisions about their education and future careers.',
    },
    {
      question: 'Why is Career Guidance important for students?',
      answer:
        'It helps students choose the right academic stream, courses, and career paths based on their skills, interests, and aspirations. It reduces confusion and builds confidence for the future.',
    },
    {
      question: 'Who provides Career Guidance?',
      answer:
        'Career counselors, teachers, and mentors provide career guidance. Many schools, universities, and online platforms also offer dedicated career counseling programs.',
    },
    {
      question: 'When should a student seek Career Guidance?',
      answer:
        'Career guidance can be sought at any stage, but it is especially useful during high school and college years when students make crucial decisions about courses and careers.',
    },
    {
      question: 'What resources are available for Career Guidance?',
      answer:
        'Students can access aptitude tests, counseling sessions, workshops, career fairs, and online resources that provide insights into different career options and industries.',
    },
  ];

  return (
    <div className="py-28 mt-12 bg-gray-100 shadow-lg rounded-lg">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-24">
          Have questions about Career Guidance? Below are the most common
          questions asked by students, along with helpful answers. If you don’t
          find what you’re looking for, feel free to reach out to us!
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="collapse collapse-plus bg-white border border-gray-200 shadow-xl"
            data-aos="fade-up"
            data-aos-delay={`${index * 100}`}
          >
            {/* Toggle */}
            <input
              type="checkbox"
              id={`faq-${index}`}
              className="peer hidden"
            />
            <label
              htmlFor={`faq-${index}`}
              className="collapse-title font-semibold text-gray-800 cursor-pointer"
            >
              {item.question}
            </label>

            {/* Answer */}
            <div className="collapse-content text-sm text-gray-600 p-4 bg-gray-50">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestions;
