import Card from "@/components/Molecules/Card";
import { Col, Container, Row } from "react-bootstrap";

import styles from "../../../styles/friends.module.scss";
import usePagination, { Loader } from "@/hooks/usePagination";
import InfiniteScroll from "react-infinite-scroll-component";

const Articles = () => {
  const {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    mutate,
    isValidating
  } = usePagination("/api/posts/user/all", "posts");

  return (
    <Container>
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={!isReachedEnd}
        loader={<Loader />}
        endMessage={
          <p style={{ textAlign: "center", color: "gray" }}>
            <b>Yay! You have seen it all...</b>
          </p>
        }
        dataLength={paginatedData?.length ?? 0}
      >
        <Row>
          {paginatedData.map((post: Record<string, any>, key: number) => (
            <Col key={`posts_${key}`} md={6} className={`my-4 ${styles.card}`}>
              <Card
                _id={post._id}
                image={post.media[0] || "/images/postPlaceholder.jpg"}
                title={post.postTitle}
                body={post.postBody}
                author={post.author}
                size="any"
              />
            </Col>
          ))}
          {isValidating && (
            <p style={{ textAlign: "center", color: "gray" }}>
              <b>Fetching Post...</b>
            </p>
          )}
          {!isValidating && !isReachedEnd ? (
            <p
              className="text-primary"
              style={{ textAlign: "center", color: "gray" }}
              onClick={() => mutate()}
            >
              <b>See more...</b>
            </p>
          ) : null}
          {error && (
            <p
              style={{
                textAlign: "center",
                color: "gray",
                marginTop: "1.2rem"
              }}
            >
              <b>Oops! Something went wrong</b>
            </p>
          )}
        </Row>
      </InfiniteScroll>
    </Container>
  );
};

export default Articles;
