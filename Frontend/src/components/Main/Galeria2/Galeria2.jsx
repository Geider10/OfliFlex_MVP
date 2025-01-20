import styles from "./Galeria.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Galeria = () => {
  return (
    <div className={styles.main_container}>
      <div id="carouselExampleFade" className="carousel slide carousel-fade h-100">
        <div className="carousel-inner h-100">

          <div className="carousel-item active h-100">
            <img
              src="galery/img-oficinas.webp"
              className={`${styles.carousel_image}`}
              alt="Sala 1"
            />
          </div>

          <div className="carousel-item h-100">
            <img
              src="galery/img-salas.webp"
              className={`${styles.carousel_image}`}
              alt="Sala 2"
            />
          </div>

        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Galeria;