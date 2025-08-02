const { useState, useMemo } = require("react")

const useFetch = (url, method = 'GET', options = {}) => {
    const [ data, setData ] = useState(null)
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)
    const [ refreshIndex, setRefreshIndex ] = useState(0)

    const optionsString = JSON.stringify(options) 

    const requestOptions = useMemo(() => {
        const opts = { ...options }
        if (method === 'POST' && !opts.data) {
            //
        }
    }, [ method, optionsString ] )

} 