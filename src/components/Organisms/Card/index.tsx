import React from 'react'
import { 
    Card as ICard,
    Image 
} from 'react-bootstrap'
import striptags from "striptags";
import Age from "@/components/Atoms/Age";


const Card = ( {post,
    trimmed,
    author,
    // onNavigate,
  }: {
    post: Record<string, any>;
    trimmed?: Boolean;
    author: any;
    // onNavigate?: (params?: any) => void;
  }) => {
  return (
    <>
        <ICard
        id={post?.id}
        className="my-3 cards"
        style={{
          border: "none",
        }}>
            <div>
                <ICard.Title
                    className={`position-relative d-flex justify-content-start gap-2 pb-2 border-bottom`}
                >
                    <Image
                    src={"/images/imagePlaceholder.jpg"}
                    width={45}
                    height={45}
                    alt=""
                    roundedCircle
                    />
                    <div className="d-flex flex-column">
                    <div>
                            <small
                            dangerouslySetInnerHTML={{
                                __html: `${author?.firstName} ${author?.lastName}`,
                            }}
                            />
                            <br />
                            <span style={{ marginTop: "10px", fontSize: "13px" }}>
                            <Age time={post?.createdAt} />
                            </span>
                        </div>
                    </div>
                </ICard.Title>
            </div>
            <ICard.Body>
                

                <ICard.Text>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: trimmed
              
                              ? striptags(
                                  post?.postBody || post?.post,
                                  "<p> <strong> <b> <a> <em> <i>"
                                )?.slice(0, 500) + "..."
                              : post?.postTitle || post?.title
              
                          }}
                    />
                </ICard.Text>

                {!trimmed && (
                <Image
                    className="d-none d-sm-block d-lg-none"
                    style={{ borderRadius: 0 }}
                    src={"/images/formbg.png"}
                    fluid
                    alt={""}
                />
                )}
                
            </ICard.Body>
        </ICard>
    </>
  )
}

export default Card