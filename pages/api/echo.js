export default async (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    if (req.method === 'POST' && req.body) {
        let response = await fetch('http://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token-access': 'random'
            },
            body: JSON.stringify(req.body)
        });
        if (response.ok) {
            const result = await response.json();
            console.log(result);
        }

        res.end(JSON.stringify({
            message: response.ok,
        }))
    } else {

        res.end(JSON.stringify({
            message: req.query.message ?? 'message',
        }))
    }
}
