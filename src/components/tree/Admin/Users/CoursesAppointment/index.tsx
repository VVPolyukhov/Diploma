import { Form, Modal, Select } from "antd";
import Spinner from "components/shared/Spinner";
import { ICourseItem } from "components/tree/Courses/Item";
import React from "react";
import { useGetCoursesQuery } from "store/courses/api";
import { useAssignUserToCourseMutation } from "store/user/api";
import styles from "./index.module.scss";

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRowKeys: string[];
}
const CouresesAppointmentModal: React.FC<IProps> = ({
  isModalOpen,
  setIsModalOpen,
  selectedRowKeys,
}) => {
  const [form] = Form.useForm();

  const { data, isLoading: isUsersLoading } = useGetCoursesQuery({
    limit: 9999,
  });
  const [assignUserToCourse, { isLoading }] = useAssignUserToCourseMutation();

  const handleOk = async () => {
    const values = form.getFieldsValue();
    const payload = {
      userId: selectedRowKeys[0],
      courseId: values.courseId,
    };
    try {
      await assignUserToCourse(payload).unwrap();
      setIsModalOpen(false);
    } catch (error) {}
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const options = (data?.result as ICourseItem[])?.map(({ title, id }) => ({
    label: title,
    value: id,
  }));
  return (
    <Modal
      title="Назначение курса на пользователя"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{
        loading: isLoading,
      }}
    >
      {isUsersLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <Form form={form} layout="vertical" className={styles.form}>
          <Form.Item label="Какой курс желаете назначить?" name="courseId">
            <Select options={options} />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default CouresesAppointmentModal;
