import Link from 'next/link';
import { ChatBot } from '@/components/ChatBot';
import SearchWidget from '@/components/SearchWidget';

const features = [
  {
    tag: 'Discover',
    title: 'Products & Services',
    description:
      'Browse the catalogue of platforms, tools, and APIs available across government. Find what you need to build your service.',
    href: '/products',
  },
  {
    tag: 'Learn',
    title: 'Guidelines',
    description:
      'Standards and best practices organised by project lifecycle — from inception through to measuring success.',
    href: '/guidelines',
  },
  {
    tag: 'Build',
    title: 'Documentation',
    description:
      'Technical documentation for platforms, APIs, and tools. Getting started guides, reference, and tutorials.',
    href: '/docs',
  },
  {
    tag: 'Connect',
    title: 'Community',
    description:
      'Join the cross-government developer community. Events, blogs, Slack channels, and open source.',
    href: '/community',
  },
];

const govTools = [
  {
    name: 'GOV.UK Pay',
    description: 'Take and process payments for government services.',
    href: 'https://www.payments.service.gov.uk/',
  },
  {
    name: 'GOV.UK Notify',
    description: 'Send emails, text messages, and letters to users.',
    href: 'https://www.notifications.service.gov.uk/',
  },
  {
    name: 'GOV.UK Forms',
    description: 'No-code form builder for government services.',
    href: 'https://www.forms.service.gov.uk/',
  },
  {
    name: 'GOV.UK Prototype Kit',
    description: 'Rapid prototyping toolkit for GOV.UK services.',
    href: 'https://prototype-kit.service.gov.uk/docs/',
  },
  {
    name: 'GOV.UK Frontend',
    description: 'Components and styles for government services.',
    href: 'https://frontend.design-system.service.gov.uk/',
  },
];

const keyStandards = [
  {
    name: 'MoJ AI Governance Framework',
    href: 'https://technical-guidance.service.justice.gov.uk/documentation/governance/ai-governance-framework.html#introduction',
  },
  {
    name: 'Service Standard',
    href: 'https://www.gov.uk/service-manual/service-standard',
  },
  {
    name: 'Technology Code of Practice',
    href: 'https://www.gov.uk/guidance/the-technology-code-of-practice',
  },
];

const whatsNew = [
  {
    date: '2026-02-27',
    title: 'Developer Portal launched in Alpha',
    description: 'The Ministry of Magic Developer Portal is now available for feedback. Explore documentation from Cloud Platform, Modernisation Platform, and Analytical Platform.',
  },
  {
    date: '2026-02-25',
    title: 'Cloud Platform User Guide updated',
    description: 'New guidance on deploying containerised applications with GitHub Actions CI/CD pipelines.',
  },
  {
    date: '2026-02-20',
    title: 'Modernisation Platform networking docs refreshed',
    description: 'Updated documentation covering VPC configuration, transit gateway, and DNS resolution.',
  },
  {
    date: '2026-02-15',
    title: 'API design standards published',
    description: 'New cross-government standards for RESTful API design, versioning, and error handling.',
  },
];

export default function Home() {
  return (
    <>
      <div className="app-hero">
        <div className="govuk-width-container">
          <h1 className="govuk-heading-xl app-hero__title">Ministry of Magic Developer Portal</h1>
          <p className="app-hero__description">
            The central place for cross-government developers to discover products,
            read documentation, and follow best practice guidelines.
          </p>
          <div className="app-hero__search app-search">
            <SearchWidget />
          </div>
        </div>
      </div>

      <section className="govuk-!-margin-top-8">
        <div className="app-cards">
          {features.map((feature) => (
            <div key={feature.href} className="app-card">
              <span className="app-card__tag">{feature.tag}</span>
              <h2 className="govuk-heading-m app-card__title">
                <Link href={feature.href} className="govuk-link app-card__title-link">
                  {feature.title}
                </Link>
              </h2>
              <p className="govuk-body app-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="govuk-!-margin-top-6">
        <h2 className="govuk-heading-l">Government tools &amp; services</h2>
        <p className="govuk-body-l">
          Real tools available to teams building government services — use them today.
        </p>
        <div className="app-cards">
          {govTools.map((tool) => (
            <div key={tool.name} className="app-card">
              <h3 className="govuk-heading-s app-card__title">
                <a href={tool.href} className="govuk-link app-card__title-link" rel="noopener noreferrer">
                  {tool.name}
                </a>
              </h3>
              <p className="govuk-body app-card__description">{tool.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="govuk-!-margin-top-6">
        <h2 className="govuk-heading-l">Key standards</h2>
        <ul className="govuk-list govuk-list--bullet">
          {keyStandards.map((s) => (
            <li key={s.name}>
              <a href={s.href} className="govuk-link" rel="noopener noreferrer">{s.name}</a>
            </li>
          ))}
        </ul>
      </section>

      <section className="govuk-!-margin-top-6">
        <h2 className="govuk-heading-l">What&apos;s new</h2>
        <div>
          {whatsNew.map((item, index) => (
            <div key={index} className="app-whats-new__item">
              <span className="app-whats-new__date">
                {new Date(item.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              <h3 className="govuk-heading-s govuk-!-margin-bottom-1 govuk-!-margin-top-1">
                {item.title}
              </h3>
              <p className="govuk-body">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <ChatBot />
    </>
  );
}
