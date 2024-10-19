/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Paragraph from '../components/Paragraph.vue';

describe('Paragraph test', () => {
  const title = 'Paragraph test';
  it('should render component title', () => {
    const wrapper = mount(Paragraph, {
      propsData: {
        task: {
          header: title,
          content: 'Content',
        }
      }
    });

    expect(wrapper.find('h3').text()).toEqual(title);
  });
});
