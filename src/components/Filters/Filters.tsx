import React, { useState, FC } from 'react'
import styles from './Filters.module.scss'
import FilterSelect from '../FilterSelect/FilterSelect'
import FilterSearch from '../FilterSearch/FilterSearch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Filters: FC<any> = ({ genres, yearFilter }) => {
    const [currentModal, setCurrentModal] = useState<string>('')
    const [ratingValue, setRatingValue] = useState<string>('0')
    const [ratesAmountValue, setRatesAmountValue] = useState<string>('0')

    return (
        <div className={styles.filters}>
            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.selects}>
                        <FilterSelect
                            filterType="genres"
                            currentModal={currentModal}
                            setCurrentModal={setCurrentModal}
                            genres={genres}
                        />
                        <FilterSelect
                            filterType="countries"
                            currentModal={currentModal}
                            setCurrentModal={setCurrentModal}
                        />
                        <FilterSelect
                            filterType="years"
                            currentModal={currentModal}
                            setCurrentModal={setCurrentModal}
                            yearFilter={yearFilter}
                        />
                        <FilterSearch searchType="producer" />
                        <FilterSearch searchType="actor" />
                    </div>
                    <div className={styles.ranges}>
                        <div className={styles.range}>
                            <p>{`Рейтинг:`}</p>
                            <input
                                type="range"
                                value={ratingValue}
                                onChange={(e) => setRatingValue(e.target.value)}
                                min="0"
                                max="10"
                                step="0.1"
                            />
                            <span>{ratingValue}</span>
                        </div>
                        <div className={styles.range}>
                            <p>{`Количество оценок:`}</p>
                            <input
                                type="range"
                                value={ratesAmountValue}
                                onChange={(e) =>
                                    setRatesAmountValue(e.target.value)
                                }
                                min="0"
                                max="990"
                                step="10"
                            />
                            <span>{ratesAmountValue}</span>
                        </div>
                    </div>
                    <button className={styles.reset} disabled={true}>
                        <div>
                            <FontAwesomeIcon icon={faXmark} size="xl" />
                        </div>
                        <span>{`Сбросить фильтры`}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filters
