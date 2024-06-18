import type { Schema, Attribute } from '@strapi/strapi';

export interface ProgramObjective extends Schema.Component {
  collectionName: 'components_program_objectives';
  info: {
    displayName: 'Objective';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface SubjectDetails extends Schema.Component {
  collectionName: 'components_subject_details';
  info: {
    displayName: 'details';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    featured: Attribute.Boolean & Attribute.DefaultTo<false>;
    featuredOrder: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'program.objective': ProgramObjective;
      'subject.details': SubjectDetails;
    }
  }
}
