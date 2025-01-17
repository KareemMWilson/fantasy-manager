import { ReactNode } from 'react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  ButtonProps,
  DialogRootProps,
} from "@chakra-ui/react"
import Button from '../Button';

interface CustomDialogProps extends DialogRootProps {
  triggerText?: string;
  trigger?: ReactNode;
  title?: string;
  content: ReactNode;
  confirmButton?: {
    text: string;
    onClick?: () => void;
    props?: ButtonProps;
  };
  cancelButton?: {
    text: string;
    onClick?: () => void;
    props?: ButtonProps;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Dialog = ({
  triggerText,
  trigger,
  title,
  content,
  confirmButton = { text: 'Confirm' },
  cancelButton = { text: 'Cancel' },
}: CustomDialogProps) => {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogBody>
          {content}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button 
              variant="outline" 
              onClick={cancelButton.onClick}
              {...cancelButton.props}
            >
              {cancelButton.text}
            </Button>
          </DialogActionTrigger>
          <Button
            onClick={confirmButton.onClick}
            colorScheme="blue"
            {...confirmButton.props}
          >
            {confirmButton.text}
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default Dialog;