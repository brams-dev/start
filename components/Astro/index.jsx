import { WiSunrise, WiSunset } from 'react-icons/wi';
import useSWR from 'swr';

export default function Astro(props) {
	const { data } = useSWR(props.lat && props.long ? `https://api.sunrise-sunset.org/json?lat=${props.lat}&lng=${props.long}&date=today&formatted=0` : null);

	const renderSunriseSunset = () => {
		const sunrise = new Date(data.results.sunrise);
		const sunset = new Date(data.results.sunset);
		return (
			<div className='sunrise-sunset'>
				<span className='sunrise'><WiSunrise />{sunrise.getHours()}:{sunrise.getMinutes()}</span>
				<span className='sunset'><WiSunset />{sunset.getHours()}:{sunset.getMinutes()}</span>
			</div>
		);
	};

	if (!data) return null;
	if (!props.showSun) return null;

	return (
		<div className='Astro' style={{ backgroundColor: `rgba(0, 0, 0, ${props.opacity ?? 0.5})` }}>
			{props.showSun && data?.results?.sunrise && data?.results?.sunset && renderSunriseSunset()}
		</div>
	);
}
