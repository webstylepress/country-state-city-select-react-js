import { useState } from 'react';
import { Country, State, City } from 'country-state-city';
import './App.css';

function App() {
	const [countries, setCountries] = useState(Country.getAllCountries());
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState(null);
	const [selectedState, setSelectedState] = useState(null);

	const handleCountryChange = (country) => {
		setSelectedCountry(country);
		setStates(State.getStatesOfCountry(country.isoCode));
		setCities([]);
	};

	const handleStateChange = (state) => {
		setSelectedState(state);
		setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col'>
					<select
						className='form-select'
						onChange={(e) =>
							handleCountryChange(
								countries.find((c) => c.isoCode === e.target.value),
							)
						}>
						<option value=''>Select Country</option>
						{countries.map((country) => (
							<option key={country.isoCode} value={country.isoCode}>
								{country.name}
							</option>
						))}
					</select>
				</div>
				<div className='col'>
					<select
						disabled={!selectedCountry}
						className='form-select'
						onChange={(e) =>
							handleStateChange(
								states.find((s) => s.isoCode === e.target.value),
							)
						}>
						<option value=''>Select State</option>
						{states.map((state) => (
							<option key={state.isoCode} value={state.isoCode}>
								{state.name}
							</option>
						))}
					</select>
				</div>
				<div className='col'>
					<select
						disabled={!selectedState || !selectedCountry}
						className='form-select'>
						<option value=''>Select City</option>
						{cities.map((city) => (
							<option key={city.name} value={city.name}>
								{city.name}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}

export default App;
