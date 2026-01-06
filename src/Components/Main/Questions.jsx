import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "What is StreamVibe?",
    answer: "StreamVibe is a streaming platform with lots of movies and shows.",
  },
  {
    id: 2,
    question: "How do I sign up for StreamVibe?",
    answer: "You can sign up by creating an account using your email.",
  },
  {
    id: 3,
    question: "What is the StreamVibe free trial?",
    answer: "StreamVibe offers a 7-day free trial for new users.",
  },
  {
    id: 4,
    question: "How much does StreamVibe cost?",
    answer: "The platform offers different pricing plans.",
  },
  {
    id: 5,
    question: "How do I contact StreamVibe customer support?",
    answer: "You can reach support via email or live chat.",
  },
  {
    id: 6,
    question: "What content is available on StreamVibe?",
    answer: "Movies, series, documentaries and more.",
  },
  {
    id: 7,
    question: "What are the StreamVibe payment methods?",
    answer: "We accept debit cards, credit cards, and PayPal.",
  },
  {
    id: 8,
    question: "How can I watch StreamVibe?",
    answer: "You can watch on mobile, TV, laptop or tablet.",
  },
];

const AccordionItem = ({ item, isOpen, onToggle }) => {
  return (
    <div className="w-full max-w-[600px]">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
      >
        <div className="flex items-center gap-5">
          <span className="text-lg bg-[#161616] px-5 py-4 rounded-lg">
            {String(item.id).padStart(2, "0")}
          </span>
          <span className="text-base md:text-lg">{item.question}</span>
        </div>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-400 pl-[90px] pb-4">
          {item.answer}
        </p>
      </div>

      <div className="h-px bg-gradient-to-r from-black via-red-600 to-black" />
    </div>
  );
};

const Questions = () => {
  const [openId, setOpenId] = useState(faqData[0].id); // first open by default

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-black/95 text-white px-4 md:px-12 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-400 mt-2 max-w-xl">
            Got questions? We've got answers! Check out our FAQ section to find
            answers.
          </p>
        </div>

        <button className="self-start md:self-auto px-6 py-4 bg-red-600 rounded-md cursor-pointer">
          Ask a Question
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-6">
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => toggle(item.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Questions;
