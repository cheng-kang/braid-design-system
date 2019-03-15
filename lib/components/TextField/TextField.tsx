import React, {
  Component,
  ReactNode,
  AllHTMLAttributes,
  Fragment,
} from 'react';
import ThemeConsumer from '../ThemeConsumer/ThemeConsumer';
import Box from '../Box/Box';
import FieldLabel from '../FieldLabel/FieldLabel';
import FieldMessage from '../FieldMessage/FieldMessage';
import classnames from 'classnames';
import styles from './TextField.css.js';

const validTypes = {
  text: 'text',
  password: 'password',
  email: 'email',
  search: 'search',
  number: 'number',
  tel: 'tel',
  url: 'url',
};

type NativeInputProps = AllHTMLAttributes<HTMLInputElement>;
interface TextFieldProps {
  id: NonNullable<NativeInputProps['id']>;
  value: NonNullable<NativeInputProps['value']>;
  onChange: NonNullable<NativeInputProps['onChange']>;
  onBlur?: NativeInputProps['onBlur'];
  onFocus?: NativeInputProps['onFocus'];
  label?: string;
  secondaryLabel?: ReactNode;
  tertiaryLabel?: ReactNode;
  placeholder?: string;
  message?: ReactNode | false;
  tone?: 'neutral' | 'critical' | 'positive';
  type?: keyof typeof validTypes;
}

export default class TextField extends Component<TextFieldProps> {
  static displayName = 'TextField';

  render() {
    const {
      id,
      label,
      secondaryLabel,
      tertiaryLabel,
      placeholder,
      message,
      tone = 'neutral',
      value,
      type = 'text',
      onChange,
      onBlur,
      onFocus,
    } = this.props;

    const messageId = `${id}-message`;

    return (
      <ThemeConsumer>
        {theme => (
          <Fragment>
            <FieldLabel
              id={id}
              label={label}
              secondaryLabel={secondaryLabel}
              tertiaryLabel={tertiaryLabel}
            />
            <Box className={styles.root}>
              <Box
                component="input"
                type={validTypes[type]}
                id={id}
                backgroundColor="input"
                boxShadow={
                  tone === 'critical' ? 'borderCritical' : 'borderStandard'
                }
                width="full"
                paddingLeft="small"
                paddingRight="small"
                paddingTop="standardTouchableText"
                paddingBottom="standardTouchableText"
                borderRadius="standard"
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                aria-describedby={messageId}
                className={classnames(
                  styles.input,
                  theme.atoms.fontFamily.text,
                  theme.atoms.fontSize.standard,
                  theme.atoms.color.neutral,
                )}
              />
              <Box
                className={styles.focusOverlay}
                boxShadow="outlineFocus"
                borderRadius="standard"
                paddingTop="standardTouchableText"
                paddingBottom="standardTouchableText"
              />
            </Box>
            <FieldMessage id={messageId} tone={tone} message={message} />
          </Fragment>
        )}
      </ThemeConsumer>
    );
  }
}