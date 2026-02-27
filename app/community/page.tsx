import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ChatBot } from '@/components/ChatBot';

export default function CommunityPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: 'Community' }]} />

      <h1 className="govuk-heading-xl">Community</h1>
      <p className="govuk-body-l">
        Connect with the cross-government developer community through Slack, events,
        blogs, and open source.
      </p>

      <div className="app-cards">
        <div className="app-card">
          <span className="app-card__tag">Chat</span>
          <h2 className="govuk-heading-m app-card__title">Slack Channels</h2>
          <p className="govuk-body app-card__description">
            Join the Ministry of Magic Digital &amp; Technology Slack workspace. Key channels:
            #developers, #cloud-platform, #modernisation-platform, #security.
          </p>
        </div>

        <div className="app-card">
          <span className="app-card__tag">Code</span>
          <h2 className="govuk-heading-m app-card__title">
            <a href="https://github.com/totleightowers" className="govuk-link app-card__title-link" rel="noopener noreferrer">
              Open Source
            </a>
          </h2>
          <p className="govuk-body app-card__description">
            Browse our open source projects on GitHub. We code in the open by default.
          </p>
        </div>

        <div className="app-card">
          <span className="app-card__tag">Learn</span>
          <h2 className="govuk-heading-m app-card__title">
            <a href="https://github.com/totleightowers/developer-portal" className="govuk-link app-card__title-link" rel="noopener noreferrer">
              Blog
            </a>
          </h2>
          <p className="govuk-body app-card__description">
            Read about what teams are building, technical decisions, and lessons learned
            on the Ministry of Magic Digital blog.
          </p>
        </div>

        <div className="app-card">
          <span className="app-card__tag">Events</span>
          <h2 className="govuk-heading-m app-card__title">Events &amp; Meetups</h2>
          <p className="govuk-body app-card__description">
            Regular tech talks, show-and-tells, and cross-government meetups. Watch
            this space for upcoming events.
          </p>
        </div>
      </div>

      <div className="govuk-inset-text govuk-!-margin-top-6">
        <h2 className="govuk-heading-m">Contributing to the Developer Portal</h2>
        <p className="govuk-body">
          This portal is open source and accepts contributions. You can:
        </p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Add your team&apos;s documentation by creating a <code>portal.yaml</code> in your repo</li>
          <li>Suggest new products or guidelines via pull request</li>
          <li>Report issues or request features on GitHub</li>
        </ul>
      </div>

      <ChatBot />
    </>
  );
}
