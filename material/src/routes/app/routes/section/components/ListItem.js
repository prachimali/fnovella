import React from 'react';

class ListItem extends React.Component {
  render () {
    return (
          <tr>
            <td className="mdl-data-table__cell--non-numeric">{this.props.number}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.sectionData.name}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.sectionData.code}</td>
            <td className="mdl-data-table__cell--non-numeric">{this.props.sectionData.jornada}</td>
            <td className="mdl-data-table__cell--non-numeric" style={{textAlign:'right'}}>
              <button
                onClick={()=>{this.props.onDelete(this.props.sectionData.id)}}

                type="submit" className="btn btn-primary">Eliminar</button>
              &nbsp;
              &nbsp;
              <button
                onClick={()=>{this.props.onEdit(this.props.sectionData)}}

                type="submit" className="btn btn-primary">Editar</button>
            </td>
          </tr>
          );
  }
}

export default ListItem;