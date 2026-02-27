import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ChatBot } from '@/components/ChatBot';
import guidelines from '@/content/guidelines/guidelines.json';

interface Phase {
  key: string;
  title: string;
  description: string;
  cssModifier: string;
}

const phases: Phase[] = [
  {
    key: 'inception',
    title: '1. Project Inception',
    description: 'Starting your project — understanding the problem, assessing feasibility, and planning your approach.',
    cssModifier: 'inception',
  },
  {
    key: 'development',
    title: '2. Development & Iteration',
    description: 'Building your service — coding standards, security practices, and agile delivery.',
    cssModifier: 'development',
  },
  {
    key: 'technology',
    title: '3. Technology Choice',
    description: 'Choosing the right tools — languages, frameworks, platforms, and open source.',
    cssModifier: 'technology',
  },
  {
    key: 'standards',
    title: '4. Standards & Best Practices',
    description: 'Cross-cutting standards — accessibility, security, incident management, and operational excellence.',
    cssModifier: 'standards',
  },
  {
    key: 'measuring',
    title: '5. Measuring Success',
    description: 'Understanding impact — metrics, monitoring, service health, and user satisfaction.',
    cssModifier: 'measuring',
  },
];

export default function GuidelinesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Guidelines' }]} />

      <h1 className="govuk-heading-xl">Guidelines</h1>
      <p className="govuk-body-l">
        Standards and best practices organised by project lifecycle. Follow these guidelines
        to build services that meet Ministry of Magic and cross-government expectations.
      </p>

      <h2 className="govuk-heading-l">Real-world standards and guidance</h2>
      <p className="govuk-body">
        Use these published standards and frameworks alongside the portal guidance.
      </p>
      <ul className="govuk-list govuk-list--bullet">
        <li>
          <a
            href="https://technical-guidance.service.justice.gov.uk/documentation/governance/ai-governance-framework.html#introduction"
            className="govuk-link"
            rel="noopener noreferrer"
          >
            MoJ AI Governance Framework
          </a>
        </li>
        <li>
          <a href="https://www.gov.uk/service-manual" className="govuk-link" rel="noopener noreferrer">
            GOV.UK Service Manual
          </a>
        </li>
        <li>
          <a href="https://www.gov.uk/service-manual/service-standard" className="govuk-link" rel="noopener noreferrer">
            GOV.UK Service Standard
          </a>
        </li>
        <li>
          <a href="https://design-system.service.gov.uk/" className="govuk-link" rel="noopener noreferrer">
            GOV.UK Design System
          </a>
        </li>
        <li>
          <a href="https://www.gov.uk/guidance/the-technology-code-of-practice" className="govuk-link" rel="noopener noreferrer">
            Technology Code of Practice
          </a>
        </li>
        <li>
          <a href="https://www.gov.uk/guidance/gds-api-technical-and-data-standards" className="govuk-link" rel="noopener noreferrer">
            GDS API technical and data standards
          </a>
        </li>
        <li>
          <a href="https://www.ncsc.gov.uk/collection/developers-collection" className="govuk-link" rel="noopener noreferrer">
            NCSC Developers Collection
          </a>
        </li>
      </ul>

      {phases.map((phase) => {
        const phaseGuidelines = guidelines.filter((g) => g.phase === phase.key);
        return (
          <div key={phase.key} className={`app-phase-card app-phase-card--${phase.cssModifier}`}>
            <h2 className="govuk-heading-l govuk-!-margin-bottom-1">{phase.title}</h2>
            <p className="govuk-body">{phase.description}</p>
            {phaseGuidelines.length > 0 && (
              <ul className="govuk-list">
                {phaseGuidelines.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guidelines/${g.slug}`} className="govuk-link">
                      {g.title}
                    </Link>
                    <span className="govuk-body-s" style={{ color: '#505a5f', marginLeft: 8 }}>
                      — {g.description}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}

      <ChatBot />
    </>
  );
}
