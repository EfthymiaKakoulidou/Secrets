import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Diary from "./Diary";


function DiaryPage() {
    const { id } = useParams();
    const [diary, setDiary] = useState({ results: [] });
    

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: diary }] = await Promise.all([
              axiosReq.get(`/diary/${id}`),
              axiosReq.get(`/comments/?diary=${id}`),
            ]);
            setDiary({ results: [diary] });
            
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);
     

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <Diary {...diary.results[0]} setDiarys={setDiary} diaryPage />
      
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Profiles
      </Col>
    </Row>
  );
}

export default DiaryPage;