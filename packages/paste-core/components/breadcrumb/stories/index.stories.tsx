import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs} from '@storybook/addon-knobs';
import {Anchor} from '@twilio-paste/anchor';
import {Box} from '@twilio-paste/box';
import {Text} from '@twilio-paste/text';
import {Truncate} from '@twilio-paste/truncate';
import {Breadcrumb, BreadcrumbItem} from '../src';

storiesOf('Components|Breadcrumb', module)
  .addDecorator(withKnobs)
  .add('Anchors', () => {
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <Anchor href="#">Phone Numbers</Anchor>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Anchor href="#">Active Numbers</Anchor>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  })
  .add('Anchors and current page ', () => {
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <Anchor href="#">Phone Numbers</Anchor>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Anchor href="#">Active Numbers</Anchor>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text aria-current="page" as="span" fontSize="fontSize20" lineHeight="lineHeight20">
            Infrrd Germany hotline B
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  })
  .add('Anchors with truncation ', () => {
    return (
      <Breadcrumb>
        <BreadcrumbItem>
          <Anchor href="#">Phone Numbers</Anchor>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Box as="span" display="inline-flex" maxWidth="size10">
            <Truncate title="Some very long text to truncate">
              <Anchor href="#">Some very long text to truncate</Anchor>
            </Truncate>
          </Box>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Text aria-current="page" as="span" fontSize="fontSize20" lineHeight="lineHeight20">
            Infrrd Germany hotline B
          </Text>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  });
