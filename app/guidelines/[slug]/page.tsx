import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { ChatBot } from '@/components/ChatBot';
import guidelines from '@/content/guidelines/guidelines.json';

// Sample content for each guideline — in production these would be MDX files
const guidelineContent: Record<string, string> = {
  'choosing-hosting': `
## Overview

When starting a new service, one of the first decisions is where to host it. The Ministry of Magic offers two main hosting platforms:

### Cloud Platform (recommended default)

Use Cloud Platform if your application:
- Can be containerised (Docker)
- Is stateless and follows 12-factor app principles
- Needs Kubernetes features (auto-scaling, zero-downtime deploys)
- Doesn't require PSN connectivity

### Modernisation Platform

Use Modernisation Platform if your application:
- Cannot be containerised
- Needs EC2 instances or non-Kubernetes infrastructure
- Requires PSN connectivity
- Is a legacy application being migrated

### Decision tree

1. **Can your app run in a container?** → Yes → Cloud Platform
2. **Does it need PSN?** → Yes → Modernisation Platform
3. **Is it a legacy app?** → Consider Modernisation Platform for initial hosting, with a plan to migrate to Cloud Platform

### Getting started

- [Cloud Platform User Guide](/docs/cloud-platform)
- [Modernisation Platform User Guide](/docs/modernisation-platform)
  `,
  'api-design-standards': `
## Principles

All APIs should follow these core principles:

### Use RESTful conventions

- Use nouns for resource URLs: \`/creatures\`, not \`/getCreatures\`
- Use HTTP methods: GET, POST, PUT, PATCH, DELETE
- Return appropriate status codes: 200, 201, 400, 401, 403, 404, 500

### Versioning

- Include the major version in the URL: \`/v1/creatures\`
- Use semantic versioning for the API overall
- Document breaking changes clearly in the changelog

### Error handling

Return consistent error responses:

\`\`\`json
{
  "status": 400,
  "errorCode": "VALIDATION_ERROR",
  "userMessage": "The request was invalid",
  "developerMessage": "Field 'creatureId' is required",
  "moreInfo": "/docs/errors/VALIDATION_ERROR"
}
\`\`\`

### Pagination

Use cursor-based pagination for large datasets:

\`\`\`
GET /v1/creatures?cursor=abc123&limit=20
\`\`\`

### Authentication

- Use OAuth 2.0 with SpellCheck Auth for Ministry of Magic services
- Use API keys for simpler integrations
- Never pass credentials in query strings
  `,
  'accessibility-requirements': `
## Legal requirements

All public-facing government services must meet WCAG 2.2 Level AA. This is a legal requirement under the Public Sector Bodies Accessibility Regulations 2018.

### What you need to do

1. **Test with automated tools** — Use axe, WAVE, or Lighthouse. These catch ~30% of issues.
2. **Test manually** — Keyboard navigation, screen reader testing (NVDA, VoiceOver), zoom to 400%.
3. **Test with users** — Include disabled users in your research.
4. **Publish an accessibility statement** — Required by law. Use the GOV.UK template.

### Common issues

- Missing alt text on images
- Poor colour contrast (use GOV.UK Design System colours)
- Forms without proper labels
- Missing skip links
- Focus not visible on interactive elements

### GOV.UK Design System

Using the GOV.UK Design System and Frontend gives you a strong accessibility baseline. The components have been extensively tested with assistive technologies.

### Resources

- [GOV.UK accessibility requirements](https://www.gov.uk/guidance/accessibility-requirements-for-public-sector-websites-and-apps)
- [WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Ministry of Magic Design System](https://github.com/totleightowers/developer-portal)
  `,
};

const phaseLabels: Record<string, string> = {
  inception: 'Project Inception',
  development: 'Development & Iteration',
  technology: 'Technology Choice',
  standards: 'Standards & Best Practices',
  measuring: 'Measuring Success',
};

function getReviewStatus(lastReviewedOn: string, reviewIn: string): 'ok' | 'warning' | 'overdue' {
  const lastReviewed = new Date(lastReviewedOn);
  const months = parseInt(reviewIn) || 6;
  const dueDate = new Date(lastReviewed);
  dueDate.setMonth(dueDate.getMonth() + months);
  const now = new Date();
  const warningDate = new Date(dueDate);
  warningDate.setMonth(warningDate.getMonth() - 1);

  if (now > dueDate) return 'overdue';
  if (now > warningDate) return 'warning';
  return 'ok';
}

type Params = { slug: string };

export function generateStaticParams() {
  return guidelines.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guideline = guidelines.find((g) => g.slug === slug);
  if (!guideline) return {};
  return { title: guideline.title };
}

export default async function GuidelineDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const guideline = guidelines.find((g) => g.slug === slug);

  if (!guideline) {
    notFound();
  }

  const content = guidelineContent[guideline.slug] || `
## ${guideline.title}

This guideline is coming soon. Content is being developed.

**Owner:** ${guideline.owner}

If you have questions, reach out to the ${guideline.owner} team.
  `;

  const reviewStatus = getReviewStatus(guideline.lastReviewedOn, guideline.reviewIn);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: 'Guidelines', href: '/guidelines' },
          { label: guideline.title },
        ]}
      />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <span className="app-card__tag">{phaseLabels[guideline.phase]}</span>
          <h1 className="govuk-heading-xl govuk-!-margin-top-2">{guideline.title}</h1>

          <div className="app-prose-scope" dangerouslySetInnerHTML={{ __html: simpleMarkdown(content) }} />

          <div className="app-doc-meta">
            <span>
              Last reviewed:{' '}
              {new Date(guideline.lastReviewedOn).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span>
              <span className={`app-review-badge app-review-badge--${reviewStatus}`}>
                {reviewStatus === 'ok' ? '✓ Up to date' : reviewStatus === 'warning' ? '⚠ Review soon' : '✗ Review overdue'}
              </span>
            </span>
            <span>Owner: {guideline.owner}</span>
          </div>

          <FeedbackWidget />
        </div>
      </div>

      <ChatBot />
    </>
  );
}

// Minimal markdown-to-HTML for inline guideline content (ingested docs use proper remark pipeline)
function simpleMarkdown(md: string): string {
  return md
    .replace(/^### (.+)$/gm, '<h3 class="govuk-heading-m">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="govuk-heading-l">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="govuk-heading-xl">$1</h1>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="govuk-link" href="$2">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul class="govuk-list govuk-list--bullet">$&</ul>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p class="govuk-body">')
    .replace(/^(.+)$/gm, (line) => {
      if (line.startsWith('<')) return line;
      return line;
    });
}
