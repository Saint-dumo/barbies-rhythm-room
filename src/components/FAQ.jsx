import { useState } from 'react'
import '../styles/FAQ.css'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const questions = [
    {
      question: 'Who can attend Barbie’s Rhythm Room?',
      answer:
        'Everyone is welcome. Classes are designed to create a fun, welcoming space for dancers of different ages and experience levels.',
    },
    {
      question: 'What dance styles will be taught?',
      answer:
        'The room brings together Afrobeats, Amapiano and high-energy movement.',
    },
    {
      question: 'Do I need previous dance experience?',
      answer:
        'No. Whether you are completely new to dance or already have experience, you can come ready to learn, move and have fun.',
    },
    {
      question: 'How much does the class cost?',
      answer:
        'Ages 5–14 are $15, while ages 15 and above are $25.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Wear something comfortable that allows you to move freely. Come ready to dance.',
    },
    {
      question: 'How do I book my spot?',
      answer:
        'Select your preferred ticket, provide your details and complete the booking process. Your confirmation will be provided after payment.',
    },
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq" id="faq">
      <div className="faq-header">
        <span className="section-label">QUESTIONS?</span>

        <h2>
          GOOD TO
          <br />
          <em>KNOW.</em>
        </h2>

        <p>
          Everything you need to know
          <br />
          before stepping into the room.
        </p>
      </div>

      <div className="faq-list">
        {questions.map((item, index) => (
          <div
            className={`faq-item ${
              openIndex === index ? 'faq-item-open' : ''
            }`}
            key={item.question}
          >
            <button
              className="faq-question"
              onClick={() => toggleQuestion(index)}
              aria-expanded={openIndex === index}
            >
              <span className="faq-number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="faq-title">
                {item.question}
              </span>

              <span className="faq-icon">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>

            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ