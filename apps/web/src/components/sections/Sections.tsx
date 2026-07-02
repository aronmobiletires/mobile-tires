import type { HomepageQueryResult } from '@/sanity.types';
import { RichText } from './RichText';

type PageSection = NonNullable<NonNullable<HomepageQueryResult>['sections']>[number];

type SectionsProps = {
  sections: PageSection[] | null | undefined;
};

export function Sections({ sections }: SectionsProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case 'richText':
            return <RichText key={section._key} body={section.body} />;
          default:
            if (process.env.NODE_ENV !== 'production') {
              return (
                <div key={section._key} data-unknown-section={section._type}>
                  Unknown section type: <code>{section._type}</code>
                </div>
              );
            }
            return null;
        }
      })}
    </>
  );
}
