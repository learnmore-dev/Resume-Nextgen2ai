import React from 'react';
import Achiever from '../../../templates/Achiever/Achiever';
import Axis from '../../../templates/Axis/Axis';
import Borderless from '../../../templates/Borderless/Borderless';
import Clear from '../../../templates/Clear/Clear';
import Driven from '../../../templates/Driven/Driven';
import Modern from '../../../templates/Modern/Modern';
import { ClassicTemplate } from './ClassicTemplate';
import { FlexTemplate } from './FlexTemplate';
import { FrameTemplate } from './FrameTemplate';
import { CreatorTemplate } from './CreatorTemplate';

export const TemplateRenderer = ({ resume }) => {
  if (!resume) return <div style={{ color: '#64748B', padding: '20px' }}>Loading template preview...</div>;

  const tId = Number(resume.template_id) || 1;

  switch (tId) {
    case 1:
    case 10:
    case 17:
      return <Achiever resume={resume} />;

    case 2:
    case 13:
    case 21:
      return <Axis resume={resume} />;

    case 3:
    case 8:
    case 18:
      return <Borderless resume={resume} />;

    case 5:
    case 12:
    case 22:
      return <Clear resume={resume} />;

    case 7:
    case 11:
    case 24:
      return <Driven resume={resume} />;

    case 4:
    case 14:
    case 23:
      return <ClassicTemplate resume={resume} />;

    case 6:
    case 15:
    case 20:
      return <FlexTemplate resume={resume} />;

    case 9:
    case 16:
      return <CreatorTemplate resume={resume} />;

    default:
      return <Modern resume={resume} />;
  }
};

export default TemplateRenderer;
