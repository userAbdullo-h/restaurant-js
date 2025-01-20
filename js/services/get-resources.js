async function getResources (){
	try{
		const response = await fetch('http://localhost:3000/offers')
		return await response.json()
	} catch(err){console.log(err);
	} finally {console.log('Finally');
	}
}

export default getResources