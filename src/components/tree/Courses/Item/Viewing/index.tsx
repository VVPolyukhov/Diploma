import { Collapse } from "antd";
import React from "react";
import { ICourseItem } from "..";
import CourseItemHeader from "../Header";
import styles from "./index.module.scss";
const { Panel } = Collapse;

interface IProps {
  data: ICourseItem;
}
const ViewingCourseItem: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      <CourseItemHeader data={data} mode="viewing" />

      <h1 className={styles.title}>Материалы курса</h1>

      <Collapse size="large">
        {data?.chapters?.map(({ id, title, description, topics }) => {
          return (
            <Panel
              header={
                <div>
                  <h3>{title}</h3>
                  <span>{description}</span>
                </div>
              }
              key={id}
            >
              <Collapse size="large" ghost>
                {topics.map(({ description, id, linkToVideo, title }) => {
                  return (
                    <Panel
                      header={
                        <div>
                          <h4>{title}</h4>
                          <span>{description}</span>
                        </div>
                      }
                      key={id}
                    >
                      <iframe
                        width="100%"
                        height="700px"
                        src={linkToVideo}
                        title="YouTube video player"
                        // @ts-ignore
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      />
                    </Panel>
                  );
                })}
              </Collapse>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
};

export default ViewingCourseItem;
