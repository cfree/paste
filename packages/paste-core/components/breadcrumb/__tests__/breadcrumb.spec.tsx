import * as React from 'react';
import {axe} from 'jest-axe';
import {matchers} from 'jest-emotion';
import {render, screen} from '@testing-library/react';
import {Breadcrumb, BreadcrumbItem} from '../src';

expect.extend(matchers);

describe('Breadcrumb', () => {
  it('it should render a nav with correct aria-label', () => {
    const {getByRole} = render(
      <Breadcrumb>
        <BreadcrumbItem>foo</BreadcrumbItem>
        <BreadcrumbItem>bar</BreadcrumbItem>
      </Breadcrumb>
    );
    expect(getByRole('navigation').getAttribute('aria-label')).toBe('breadcrumb');
  });

  it('it should render a list with display: inline-flex', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>foo</BreadcrumbItem>
        <BreadcrumbItem>bar</BreadcrumbItem>
      </Breadcrumb>
    );
    const renderedBreadcrumb = screen.getByRole('list');
    expect(renderedBreadcrumb).toHaveStyleRule('display', 'inline-flex');
  });

  it('it should render listitems', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>foo</BreadcrumbItem>
        <BreadcrumbItem>bar</BreadcrumbItem>
      </Breadcrumb>
    );
    const renderedBreadcrumbs = screen.findByRole('listitem');
    expect(renderedBreadcrumbs).not.toBeNull();
  });

  it('it should render a breadcrumb separator', () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>foo</BreadcrumbItem>
        <BreadcrumbItem>bar</BreadcrumbItem>
      </Breadcrumb>
    );
    const renderedBreadcrumb = screen.getByText('/');
    expect(renderedBreadcrumb).toBeDefined();
  });

  describe('Accessibility', () => {
    it('Should have no accessibility violations', async () => {
      const {container} = render(
        <Breadcrumb>
          <BreadcrumbItem>foo</BreadcrumbItem>
          <BreadcrumbItem>bar</BreadcrumbItem>
        </Breadcrumb>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
