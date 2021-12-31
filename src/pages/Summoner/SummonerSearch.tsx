import React from "react"
import { useSearchParams } from "react-router-dom"

const SummonerSearch = () => {

const [searchParams] = useSearchParams();

    return (
        <div>
            summoner search
            {searchParams.get('summoner-name')}
        </div>
    )
}

export default SummonerSearch 