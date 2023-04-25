import { IMoviesData } from '@/stories/SliderSmall/SliderSmall'
import styles from './PersonFilm.module.scss'
import Image from 'next/image'
import { Button } from '@/stories/Button/ButtonStandard'
import { useRouter } from 'next/router'

const PersonFilm = ({ film }: { film: IMoviesData }) => {
    const fixedRating = +parseFloat(film.rating).toFixed(1)

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <Image
                    layout="fill"
                    objectFit="cover"
                    alt="photo"
                    src={film.previewPoster}
                />
            </div>
            <div className={styles.information}>
                <div className={styles.year}>{film.year}</div>
                <div className={styles.filmTitle}>{film.name}</div>
                <div className={styles.rating}>Рейтинг Иви: {fixedRating}</div>
            </div>
            <div className={styles.button}>
                <Button label="Смотреть" onClick={() => {}} type="watch" />
            </div>
        </div>
    )
}
export default PersonFilm
