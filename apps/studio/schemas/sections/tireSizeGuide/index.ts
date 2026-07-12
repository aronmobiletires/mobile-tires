import { defineField, defineType } from 'sanity';
import { GaugeIcon } from '@sanity/icons';

export const tireSizeGuide = defineType({
  name: 'tireSizeGuide',
  title: 'Tire Size Guide',
  type: 'object',
  icon: GaugeIcon,
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
      name: 'exampleSize',
      title: 'Example tire size',
      type: 'string',
      description: 'Format: WIDTH/RATIO R DIAMETER LOAD+SPEED, e.g. "205/55R16 91V". Shown in the diagram.',
      initialValue: '205/55R16 91V',
      validation: (Rule) =>
        Rule.required().regex(/^\d{3}\/\d{2,3}R\d{2}\s*\S*$/i, {
          name: 'tire size',
          invert: false,
        }),
    }),
  ],
  preview: {
    select: { heading: 'heading', size: 'exampleSize' },
    prepare({ heading, size }) {
      return { title: 'Tire Size Guide', subtitle: heading ?? size ?? '' };
    },
  },
});
