import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

const BASE_URL = 'https://hapi.couchsurfing.com/api/v3.2/';

function fetchResponseByURL(relativeURL) {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
}

function fetchUserById(id) {
  const relativeUrl = `/users/${id}`;
  return fetchResponseByURL(relativeUrl).then(json => json.person);
}

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    // location: {
    //   type: new GraphQLList(Host)
    //   // resolve: root => // Fetch the index of people from the REST API,
    // },
    host: {
      type: HostType,
      args: {
        id: { type: GraphQLString }
      }
      resolve: (root, args) => fetchUserById(args.id),
    }
  })
});

const HostType = new GraphQLObjectType({
  name: 'Host',
  description: 'A host returned when the search is run',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    daysSinceLastActivity: { type: GraphQLInt },
    id: { type: GraphQLString },
    isBookmarked: { type: GraphQLBoolean },
    isVerified: { type: GraphQLBoolean },
    languages: { type: new GraphQLList(LanguageType) },
    negativeReferenceCount: { type: GraphQLInt },
    neutralReferenceCount: { type: GraphQLInt },
    positiveReferenceCount: { type: GraphQLInt },
    priority: { type: GraphQLInt },
    publicAddress: { type: new GraphQLList(PublicAddressType) },
    publicName: { type: GraphQLString },
    responseRate: { type: GraphQLInt },
    status: { type: GraphQLString }
  })
});

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  description: 'Language spoke by a user',
  fields: () => ({
    code: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

const PublicAddressType = new GraphQLObjectType({
  name: 'Public Address',
  description: 'Public address of a user',
  fields: () => ({
    description: { type: GraphQLString },
    id: { type: GraphQLString }
  })
});

export default new GraphQLSchema({
  query: QueryType
});
