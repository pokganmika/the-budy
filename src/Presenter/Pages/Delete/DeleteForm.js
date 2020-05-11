import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../../Common/Elements/Buttons/PrimaryBtn';

const Container = styled.div`
  border: 1px solid red;
`;

function DeleteForm({ deleteUser }) {

  return (
    <Container>
      Delete Components
      <Button 
        text='Delete User'
        onClick={deleteUser}
      />

      <Link to='/signup'>Signup</Link>
    </Container>
  );
}

DeleteForm.propTypes = {
  deleteUser: PropTypes.func.isRequired
};

export default DeleteForm;
