import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Box, safelySpreadBoxProps} from '@twilio-paste/box';
import {Text, safelySpreadTextProps} from '@twilio-paste/text';
import {useUIDSeed} from '@twilio-paste/uid-library';

const BreadcrumbSeparator: React.FC = () => (
  <Text
    as="span"
    color="colorTextWeak"
    fontSize="fontSize20"
    lineHeight="lineHeight20"
    paddingLeft="space20"
    paddingRight="space20"
  >
    /
  </Text>
);

export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: NonNullable<React.ReactNode>;
  last?: boolean;
}

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({children, last, ...props}) => {
  return (
    <Text {...safelySpreadTextProps(props)} as="li" color="colorText" fontSize="fontSize20" lineHeight="lineHeight20">
      {children}
      {!last && <BreadcrumbSeparator />}
    </Text>
  );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

if (process.env.NODE_ENV === 'development') {
  BreadcrumbItem.propTypes = {
    children: PropTypes.node.isRequired,
    last: PropTypes.bool,
  };
}

export interface BreadcrumbProps extends React.HTMLAttributes<'nav'> {
  children: NonNullable<React.ReactNode>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({children, ...props}) => {
  const [childrenCount, validChildren] = React.useMemo(
    () => [
      React.Children.count(children),
      React.Children.toArray(children).filter(child => React.isValidElement(child) || typeof child === 'string'),
    ],
    [children]
  );
  const keySeed = useUIDSeed();

  return (
    <Box {...safelySpreadBoxProps(props)} as="nav" aria-label="breadcrumb">
      <Box alignItems="center" as="ol" display="inline-flex" listStyleType="none" margin="space0" padding="space0">
        {validChildren.map((child, index) =>
          React.cloneElement(child as React.ReactElement<any>, {
            last: childrenCount === index + 1,
            key: keySeed(`breadcrumb-${index}`),
          })
        )}
      </Box>
    </Box>
  );
};

Breadcrumb.displayName = 'Breadcrumb';

if (process.env.NODE_ENV === 'development') {
  Breadcrumb.propTypes = {
    children: PropTypes.node.isRequired,
  };
}

export {Breadcrumb, BreadcrumbItem};
