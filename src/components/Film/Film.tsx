import { IMovie } from '@/types/ComponentProps/IMovie'
import { FC } from 'react'
import styles from './Film.module.scss'
import useMediaQuery from '@/hooks/useMediaQuery'
import FilmMobile from './FilmMobile/FilmMobile'
import FilmHeader from './Header/Header'
import FilmDescription from './Description/Description'
import FilmRating from './Rating/Rating'
import 'swiper/scss'
import 'swiper/css/bundle'
import { ButtonActor } from '@/stories/Button/ButtonActor'
import { ButtonRating } from '@/stories/Button/ButtonRating'
import Image from 'next/image'
import { Button } from '@/stories/Button/ButtonStandard'
import { useTranslation } from 'next-i18next'

export interface IFilm {
    film: IMovie
}

const Film: FC<IFilm> = ({ film }) => {
    const isMobile = useMediaQuery('(max-width: 1159px)')
    const { t, i18n } = useTranslation(['film'])

    const { actors, rating, description, ratingCount } = film
    const mainActors = actors.length > 4 ? actors.slice(0, 4) : actors
    const fixedRating = +parseFloat(rating).toFixed(1)
    const id = film.trailer.split('/').at(-1)
    console.log(i18n)

    return (
        <>
            {isMobile && <FilmMobile film={film} />}
            {!isMobile && (
                <div data-testId="film" className={styles.wrapper}>
                    <div className={styles.trailer}>
                        <div className={styles.trailer__content}>
                            <div className={styles.video}>
                                <iframe
                                    width={'100%'}
                                    height={'100%'}
                                    src={`https://www.youtube.com/embed/${id}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Embedded youtube"
                                />
                            </div>
                            <div data-testid="buttons" className={styles.icons}>
                                <div className={styles.icons_left}>
                                    <Button
                                        type={'trailerControls'}
                                        src="/icons/play.svg"
                                        label={t('trailer')}
                                        height={20}
                                        width={28}
                                    />
                                </div>
                                <div className={styles.icons_center}>
                                    {[
                                        '/icons/bookmark.svg',
                                        '/icons/bell.svg',
                                        '/icons/download.svg',
                                    ].map((src, i) => {
                                        return (
                                            <Button
                                                type={'trailerControls'}
                                                src={src}
                                                key={i}
                                                height={20}
                                                width={28}
                                            />
                                        )
                                    })}
                                </div>
                                <div className={styles.icons_right}>
                                    <Button
                                        type={'freeMovies'}
                                        label={t('freeMovies')}
                                        src="/icons/play.svg"
                                        height={20}
                                        width={28}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.info}>
                        <FilmHeader film={film} />
                        <div className={styles.buttons}>
                            <ButtonActor
                                image={
                                    <ButtonRating
                                        fontSize={15}
                                        height={44}
                                        rating={fixedRating}
                                        width={44}
                                    />
                                }
                                text={t('iviRatingNoColon')}
                            />
                            {mainActors.map((actor) => (
                                <ButtonActor
                                    href={`/person/${actor.id}`}
                                    text={
                                        i18n.language === 'en'
                                            ? actor.enName
                                            : actor.name
                                    }
                                    key={actor.id}
                                    image={
                                        <Image
                                            alt={actor.enName}
                                            src={actor.photo}
                                            width={44}
                                            height={44}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    }
                                />
                            ))}
                        </div>
                        <FilmDescription text={description} />
                        <FilmRating
                            ratingCount={ratingCount}
                            fixedRating={fixedRating}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Film
