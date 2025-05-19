import * as React from "react";
import { Card, Container, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface ILogoutProps {}

const Logout: React.FunctionComponent<ILogoutProps> = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="text-center p-5 shadow logout-card justify-content-center align-items-center">
        <h2 className="text-success">You have been logged out successfully!</h2>
        <p className="text-muted">Redirecting to home in a few seconds...</p>
        <Spinner animation="border" variant="danger" className="mt-3" />
      </Card>
    </Container>
  );
};

export default Logout;
