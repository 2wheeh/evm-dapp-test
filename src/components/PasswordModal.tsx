import { useState } from 'react';

interface PasswordModalProps {
  onConfirm?: (password: string) => void;
  onCancel?: () => void;
}

export function PasswordModal({ onConfirm, onCancel }: PasswordModalProps) {
  const [password, setPassword] = useState('');

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    if (onConfirm) {
      onConfirm(password);
    }
    // if (dialogProps.onOpenChange) {
    //   dialogProps.onOpenChange(false);
    // }
  };

  // Workaround for preventing the dialog from closing not due to cancel button
  // TODO: Remove this once we have a better solution
  // const handleOpenChange = (open: boolean) => {
  //   if (open === false) {
  //     return;
  //   }
  // if (dialogProps.onOpenChange) {
  //   dialogProps.onOpenChange(open);
  // }
  // };

  return (
    <>
      <div>
        <div>TX Sign</div>
        <div>Please enter your password to proceed</div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          value={password}
          onChange={event => setPassword(event.currentTarget.value)}
          placeholder='Enter Password'
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <button type='submit' disabled={!password}>
            Confirm
          </button>
          <button
            // variant='outlined'
            type='button'
            onClick={() => {
              onCancel?.();
              setPassword('');
              // dialogProps.onOpenChange?.(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
