import React, { FunctionComponent } from "react";

interface OwnProps {}

type Props = OwnProps;

const NotFoundPage: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <h1>404</h1>
      <h1>Page not found</h1>
    </div>
  );
};

export { NotFoundPage };
