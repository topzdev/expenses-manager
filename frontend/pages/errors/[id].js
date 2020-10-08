import Banner from '../../components/Banner';
import { getAllErrorIds, getErrorData } from '../../data/errors';

export default function error({ errorData }){
	return <Banner dataProp={ errorData }/>
}

// generates the dynamic routes
export async function getStaticPaths() {
	const paths = getAllErrorIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }){
	const errorData = getErrorData(params.id)
	return {
		props: {
			errorData
		}
	}
}