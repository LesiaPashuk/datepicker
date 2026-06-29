export interface InputProps {
  value: string;
  placeholder?: string;
  error?: string;
  label?: string;
  onChange: (_value: string) => void;
  onClear: () => void;
  handleIsOpen: () => void;
}
