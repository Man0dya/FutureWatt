import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './HowToChoose.css';

const Steps = ({
  step1Title = 'Assess Your Location',
  step1Description = 'Determine if you have access to the main power grid. Off-grid is ideal for remote areas, while on-grid suits urban settings.',
  step2Title = 'Evaluate Energy Needs',
  step2Description = 'Calculate your daily energy consumption to decide between battery storage (off-grid) or grid reliance (on-grid).',
  step3Title = 'Consider Water Heating',
  step3Description = 'If hot water is a priority, explore solar hot water systems for efficiency and savings.',
  step4Title = 'Review Installation Space',
  step4Description = 'Check available roof or ground space for solar panels and equipment, as this impacts system size and type.',
  step5Title = 'Budget Planning',
  step5Description = 'Off-grid systems may have higher upfront costs due to batteries, while on-grid offers long-term savings via net metering.',
  step6Title = 'Consult Experts',
  step6Description = 'Speak with our team to finalize the best package for your needs and location.',
}) => {
  const steps = [
    { title: step1Title, description: step1Description, number: '01' },
    { title: step2Title, description: step2Description, number: '02' },
    { title: step3Title, description: step3Description, number: '03' },
    { title: step4Title, description: step4Description, number: '04' },
    { title: step5Title, description: step5Description, number: '05' },
    { title: step6Title, description: step6Description, number: '06' },
  ];

  const stepsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('steps-card--visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px 0px 0px 0px' }
    );

    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      stepsRef.current.forEach((step) => {
        if (step) observer.unobserve(step);
      });
    };
  }, []);

  return (
    <section className="steps-section" aria-label="Process Steps">
      <div className="steps-content-wrapper">
        <header className="steps-fixed-header">
          <h2 className="steps-header-title">
            How To Choose ?
          </h2>
          <p className="steps-header-subtitle">
            Follow these steps to find the perfect solar solution for your needs.
          </p>
        </header>

        <div className="steps-cards-container">
          {steps.map((step, index) => (
            <article
              key={`step-${index}`}
              ref={(el) => (stepsRef.current[index] = el)}
              className="steps-card"
              style={{
                '--step-color': index % 2 === 0
                  ? 'var(--gradient-1)'
                  : 'var(--gradient-2)',
                '--step-index': index,
              }}
            >
              <div className="steps-card-content">
                <h3 className="steps-card-title">{step.title}</h3>
                <p className="steps-card-description">{step.description}</p>
                <span className="steps-card-number">{step.number}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

Steps.propTypes = {
  step1Title: PropTypes.string,
  step1Description: PropTypes.string,
  step2Title: PropTypes.string,
  step2Description: PropTypes.string,
  step3Title: PropTypes.string,
  step3Description: PropTypes.string,
  step4Title: PropTypes.string,
  step4Description: PropTypes.string,
  step5Title: PropTypes.string,
  step5Description: PropTypes.string,
  step6Title: PropTypes.string,
  step6Description: PropTypes.string,
};

export default Steps;