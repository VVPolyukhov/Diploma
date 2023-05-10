import { Form, Modal, Select } from "antd";
import React from "react";
import styles from "./index.module.scss";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CouresesAppointmentModal: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Назначение курсов для пользователей"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form layout="vertical" className={styles.form}>
        <Form.Item label="Какие курсы хотите назначить?" name="courses">
          <Select
            mode="multiple"
            options={[
              {
                value: "Маркетинг",
                label: "Маркетинг",
              },
              {
                value: "СММ",
                label: "СММ",
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CouresesAppointmentModal;
