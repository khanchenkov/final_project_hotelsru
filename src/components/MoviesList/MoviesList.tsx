import React, { FC, useState } from 'react'
import styles from './MoviesList.module.scss'
import MoviesListSkeleton from '@/components/MoviesListSkeleton/MoviesListSkeleton'
import { Button } from '@/stories/Button/ButtonStandard'
import DefaultCarouselSlide from '@/stories/DefaultCarouselSlide/DefaultCarouselSlide'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import axios from 'axios'

const MoviesList: FC<any> = ({
    data,
    isLoading,
    setMoviesList,
    setCurrentPage,
    currentPage,
    setIsMoviesEnded,
    isMoviesEnded,
}) => {
    const { t, i18n } = useTranslation(['movies'])
    const { query } = useRouter()

    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)

    const isLess = data.length < 35 || data.length % 35 !== 0 || isMoviesEnded

    console.log(data.length, data.length < 35, data.length % 35 !== 0, currentPage)

    const showMoreHanlder = async (pageNumber: string) => {
        const queryCopy = Object.assign({}, query)
        delete queryCopy.genres
        queryCopy.page = String(Number(pageNumber) + 1)

        setIsPageLoading(true)
        try {
            const genresQuery = query.genres === 'all' ? '' : query.genres
            const response = await axios.get(`${process.env.DEPLOY_API_URL}/movies/${genresQuery}`, {
                params: { ...queryCopy },
            })
            const movies = await response.data.result
            console.log(movies)
            if (!movies.length) {
                setIsMoviesEnded(true)
                return
            }
            setCurrentPage((page: string) => String(Number(page) + 1))
            setMoviesList((state: any) => [...state, ...movies])
        } catch (err) {
            console.log(err)
        } finally {
            setIsPageLoading(false)
        }
    }

    return (
        <section>
            <div className="container">
                <div className={styles.wrapper}>
                    {!data?.length && !isLoading && <h1 className={styles.notFound}>Фильмов не найдено</h1>}
                    {isLoading && <MoviesListSkeleton />}

                    {!isLoading && data && (
                        <ul className={styles.list}>
                            {data.map((movie: any) => (
                                <li className={styles.movie} key={movie.id}>
                                    <DefaultCarouselSlide
                                        key={movie.id}
                                        rating={movie.rating}
                                        year={movie.year}
                                        href={`/watch/${movie.id}`}
                                        image={movie.poster}
                                        countries={movie.countries}
                                        genres={movie.genres}
                                        name={i18n.language === 'ru' ? movie.nameRu : movie.nameEn}
                                        duration={movie.duration}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    {!isLoading && data && !isLess && (
                        <Button
                            label={isPageLoading ? t('loading') : t('showMore')}
                            onClick={() => showMoreHanlder(currentPage)}
                            type="showMore"
                            disabled={isPageLoading}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default MoviesList
