import sanityClient from '@sanity/client';

const client = sanityClient({
    projectId: process.env.REACT_PROJECT_ID,
    dataset: 'production' ,
    apiVersion: "2023-06-24",
    useCdn: false,
    tokens: process.env.REACT_TOKENS
})

const updateUserPermissions = async (email) => {
    try {
      // Fetch the current roles
      const roles = await client.fetch('*[_type == "sanity.role"]');
  
      // Find the role you want to update
      const role = roles.find((r) => r.name === 'CodeWithAbdur');
  
      // Add the "create" permission for the desired schema type (e.g., "person")
      role.permissions = role.permissions.concat({
        resource: `person`,
        actions: ['create'],
      });
  
      // Update the role in Sanity
      await client
        .patch(role._id)
        .set({ permissions: role.permissions })
        .commit();
  
      console.log('Role permissions updated successfully.');
    } catch (error) {
      console.error('Error updating role permissions:', error);
    }
  };
  
  // Call the function and provide the user's email address
  updateUserPermissions('abdurrahmankhan2003@gmail.com');

export default client