import React from 'react';
import styled from 'styled-components';

interface ChallengeDetails {
  challengedUser: string;
  event: string;
  wager: {
    amount: number;
    currency: string;
  };
}

interface ChallengePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  challengeDetails: ChallengeDetails;
  onConfirm: () => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 91.666667%;
  max-width: 28rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<{ color: string }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ color }) => color};
  }
`;

export const ChallengePreviewModal: React.FC<ChallengePreviewModalProps> = ({
  isOpen,
  onClose,
  challengeDetails,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
        <h2 className="text-lg font-bold mb-4">Review Your Challenge</h2>
        <div className="mb-4">
          <p>
            <strong>Challenged User:</strong> @{challengeDetails.challengedUser}
          </p>
          <p>
            <strong>Event:</strong> {challengeDetails.event}
          </p>
          <p>
            <strong>Wager:</strong> {challengeDetails.wager.amount} {challengeDetails.wager.currency}
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={onClose} color="#e2e8f0">
            Edit
          </Button>
          <Button onClick={onConfirm} color="#2f855a">
            Confirm
          </Button>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};
