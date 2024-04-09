import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Reachout from "./Reachout";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import ReachoutCreateForm from "./ReachoutCreateForm";

function ReachOutPage() {
    const { id } = useParams();
    const [profile, setProfile] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [reach_out, setReach_out] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: profile }, { data: reach_out }] = await Promise.all([
              axiosReq.get(`/profiles`),
              axiosReq.get(`/reach_out`),
            ]);
            setProfile({ results: [profile] });
            setReach_out(reach_out);
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);
    

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
      <Reachout {...profile.results[0]} setprofiles={setProfile} profilePage />
        
        <Container className={appStyles.Content}>
          {currentUser ? (
        <ReachoutCreateForm
        profile_id={currentUser.profile_id}
        profileImage={profile_image}
        profileid={id}
        setprofile={setProfile}
        setreach_out={setReach_out}
        />
        ) : reach_out.results.length ? (
        "reach_out"
        ) : null}
        {reach_out.results.length ? (
            <InfiniteScroll
              children={reach_out.results.map((Reachout) => (
                <Reachout
                  key={Reachout.id}
                  {...Reachout}
                  setProfile={setProfile}
                  setReach_out={setReach_out}
                />
              ))}
              dataLength={reach_out.results.length}
              loader={<Asset spinner />}
              hasMore={!!reach_out.next}
              next={() => fetchMoreData(reach_out, setReach_out)}
            />
          ) : currentUser ? (
            <span>Reach out</span>
          ) : (
            <span>No messages yet.</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Reachout/>
      </Col>
    </Row>
  );
}

export default ReachOutPage;