import { defineArrayMember, defineField, defineType } from 'sanity';
import { PinIcon } from '@sanity/icons';

export const coverageSection = defineType({
  name: 'coverageSection',
  title: 'Coverage',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'towns',
      title: 'Towns',
      type: 'array',
      description: 'List of towns in the service area.',
      validation: (Rule) => Rule.required().min(1),
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'areaLabel',
      title: 'Area label',
      type: 'string',
      description: 'Small caption over the coverage image, e.g. "Service area · La Puente, CA" or "Service radius · 25 mi".',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { heading: 'heading' },
    prepare({ heading }) {
      return { title: 'Coverage', subtitle: heading ?? '' };
    },
  },
});
