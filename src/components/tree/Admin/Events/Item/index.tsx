import { InboxOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, InputNumber, Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { TComponentModes } from "constants/shared/components";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCreateEventMutation, useGetEventQuery } from "store/events/api";
import { convertObjectToFormData } from "utils/shared/formData";
import styles from "./index.module.scss";

interface IProps {
  mode?: TComponentModes;
}
const AdminEventsItem: React.FC<IProps> = ({ mode = "edit" }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const { data, isLoading } = useGetEventQuery(
    { id: router.query.id },
    {
      skip: !router.query.id,
    }
  );

  const [createEvent, { isLoading: isCreationLoading }] =
    useCreateEventMutation();

  useEffect(() => {
    const modifiedStartTime = dayjs(data?.startTime) || null;
    const modifiedDurationOfEvent = data?.durationOfEvent
      ? parseInt(data?.durationOfEvent.split(":")[0])
      : null;
    form.setFieldsValue({
      ...data,
      startTime: modifiedStartTime,
      durationOfEvent: modifiedDurationOfEvent,
    });
    data?.image && setFileList([data?.image]);
  }, [data]);

  const onFinish = () => {
    let { durationOfEvent, image, ...values } = form.getFieldsValue();
    values = {
      ...values,
      startTime: dayjs(values.startTime).format(),
      durationOfEvent: durationOfEvent
        ? `${
            durationOfEvent > 9 ? durationOfEvent : `0${durationOfEvent}`
          }:00:00`
        : undefined,
    };
    if (mode === "create") {
      const formData = convertObjectToFormData(values);
      formData.append("image", fileList[0]);
      createEvent(formData);
    }
  };

  const uploadHandler = (file: RcFile) => {
    setFileList([file]);
    return false;
  };

  const removeFile = () => {
    setFileList([]);
    return true;
  };

  return (
    <div className={styles.root}>
      <Header
        title={`${
          mode === "create" ? "Создание" : "Редактирование"
        } нетворкинг-мероприятия`}
        goBackButton
        additionalContent={
          <Button type="primary" onClick={onFinish} loading={isCreationLoading}>
            Сохранить
          </Button>
        }
      />
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item required name="title" label="Заголовок">
            <Input />
          </Form.Item>
          <Form.Item required name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
          <Form.Item required name="link" label="Ссылка">
            <Input />
          </Form.Item>
          <Form.Item required name="startTime" label="Начало мероприятия">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item required name="durationOfEvent" label="Длительность">
            <InputNumber />
          </Form.Item>
          <Form.Item
            required
            name="maximumNumberOfParticipants"
            label="Максимальное количество участников"
          >
            <InputNumber />
          </Form.Item>

          <Form.Item required label="Обложка" name="image">
            <Upload.Dragger
              fileList={fileList}
              beforeUpload={uploadHandler}
              onRemove={removeFile}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>
                Перетащите файл в данную область, чтобы загрузить обложку
                нетворкинг-мероприятия
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AdminEventsItem;
