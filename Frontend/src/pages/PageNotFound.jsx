import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div style={styles.page}>
            <div style={styles.card}>
                
                <img 
                    src="/image_error.png" 
                    alt="404" 
                    style={styles.image}
                />

                <h1 style={styles.title}>Page Not Found</h1>

                <p style={styles.subtitle}>
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                <Link to="/" style={styles.button}>
                    Go to Home
                </Link>
            </div>
        </div>
    );
}

const styles = {
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6fa",
        padding: "20px"
    },

    card: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        textAlign: "center",
        width: "90%",
        maxWidth: "550px",
        boxShadow: "0px 4px 15px rgba(0,0,0,0.15)"
    },

    image: {
        width: "100%",
        maxWidth: "460px",
        marginBottom: "20px",
        borderRadius: "10px"
    },

    title: {
        fontSize: "32px",
        fontWeight: "700",
        marginBottom: "10px",
        color: "#0A2342"
    },

    subtitle: {
        fontSize: "16px",
        color: "#555",
        marginBottom: "25px"
    },

    button: {
        display: "inline-block",
        backgroundColor: "#0A2342",
        color: "white",
        padding: "12px 25px",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize: "18px",
        fontWeight: "500",
        width: "fit-content",
        margin: "0 auto",
    },
};

export default PageNotFound;
