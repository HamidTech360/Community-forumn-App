import { useRouter } from "next/router";
import { setSearchModal } from "@/reduxFeatures/app/appSlice";
import { useDispatch } from "@/redux/store";

import DOMPurify from "dompurify";
import truncate from "trunc-html";
import styles from "@/styles/searchTabs.module.scss";

function PostRender({ search, index }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const sanitizer = DOMPurify.sanitize;
  return (
    <div
      className={`container-fluid my-2 text-dark ${styles.tabLi} ${
        index % 2 === 0 && styles.tabLiBg
      }`}
      onClick={() => {
        router.push(`/explore/${search?._id}`);
        dispatch(setSearchModal(false));
      }}
    >
      <div className="row align-items-center">
        <span className="col-4 h6" style={{ borderRight: "1px solid gray" }}>
          {search?.postTitle}{" "}
        </span>
        <small
          className="col-8 text-muted"
          dangerouslySetInnerHTML={{
            __html: sanitizer(truncate(search?.postBody, 50).html),
          }}
        />
      </div>
    </div>
  );
}

export default PostRender;
