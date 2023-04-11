import React, { useContext } from 'react';
import AppContext from '../context/appContext';

export default function Table() {
  const { data, name } = useContext(AppContext);
  return (
    <div className="tablestyle">
      <table>
        <thead className="trbar">
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.filter((el) => el.name.includes(name))
              .map((e, i) => (
                <tr key={ i.planet }>
                  <td data-testid="planet-name">{e.name}</td>
                  <td>{e.rotation_period}</td>
                  <td>{e.orbital_period}</td>
                  <td>{e.diameter}</td>
                  <td>{e.climate}</td>
                  <td>{e.gravity}</td>
                  <td>{e.terrain}</td>
                  <td>{e.surface_water}</td>
                  <td>{e.population}</td>
                  <td>{e.films}</td>
                  <td>{e.created}</td>
                  <td>{e.edited}</td>
                  <td>{e.url}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
