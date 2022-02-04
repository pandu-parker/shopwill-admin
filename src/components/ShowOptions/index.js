const ShowOptions = ({ option }) => {
  return (
    <div>
      Option Type: {option.name}
      <table className="my-1">
        <tr>
          <th>name</th>
          <th>price</th>
          <th>sku</th>
        </tr>
        {option.types.map(type => {
          return (
            <tr>
              {' '}
              <td>{type.name}</td> <td>{type.price}</td> <td>{type.sku}</td> 
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default ShowOptions;
